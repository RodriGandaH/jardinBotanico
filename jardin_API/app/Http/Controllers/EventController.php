<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Models\Event;
use App\Models\EventImage;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;



class EventController extends Controller
{

    public function index()
    {
        $events = Event::with('images')->get();
        return response()->json($events);
    }


    public function store(StoreEventRequest $request)
    {
        $event = Event::create([
            'name' => $request->name,
            'date' => $request->date,
            'time' => $request->time,
            'description' => $request->description
        ]);

        if ($request->hasfile('images')) {
            $counter = 1;
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . $counter . '.' . $image->extension();
                $image->move(public_path('img'), $imageName);

                EventImage::create([
                    'image' => 'img/' . $imageName,
                    'event_id' => $event->id
                ]);

                $counter++;
            }
        }

        $event->load('images');

        return response()->json($event, 201);
    }


    public function show($id)
    {
        $event = Event::with('images')->find($id);
        if ($event) {
            return response()->json($event, 200);
        } else {
            return response()->json(['error' => 'Evento no encontrado'], 404);
        }
    }


    public function update(Request $request, $id)
    {
        try {
            $this->validate($request, [
                'name' => 'required',
                'date' => 'required',
                'time' => 'required',
                'description' => 'required',
                'images' => 'sometimes|array',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $event = Event::find($id);

        if ($event) {
            $event->name = $request->name;
            $event->date = $request->date;
            $event->time = $request->time;
            $event->description = $request->description;

            if ($request->hasfile('images')) {
                $counter = 1;
                foreach ($request->file('images') as $image) {
                    $imageName = time() . '_' . $counter . '.' . $image->extension();
                    $image->move(public_path('img'), $imageName);

                    EventImage::create([
                        'image' => 'img/' . $imageName,
                        'event_id' => $event->id
                    ]);

                    $counter++;
                }
            }

            $event->save();
            $event->load('images');

            return response()->json($event, 200);
        } else {
            return response()->json(['error' => 'Evento no encontrado'], 404);
        }
    }


    public function destroy($id)
    {
        $event = Event::find($id);


        foreach ($event->images as $image) {
            $imagePath = $image->image;

            if (file_exists($imagePath)) {
                unlink($imagePath);
            }

            $image->delete();
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted']);
    }

    public function destroyImage($id)
    {
        $image = EventImage::find($id);

        if ($image) {
            if (file_exists($image->image)) {
                unlink(public_path($image->image));
            }
            $image->delete();
            return response()->json(['message' => 'Imagen eliminada correctamente'], 200);
        } else {
            return response()->json(['error' => 'Imagen no encontrada'], 404);
        }
    }
}
