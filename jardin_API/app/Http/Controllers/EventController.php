<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;

use App\Models\Event;

class EventController extends Controller
{

    public function index()
    {
        $events = Event::all();
        return response()->json($events);
    }

    public function store(StoreEventRequest $request)
    {
        $imageName = time() . '.' . $request->image->extension();
        $request->image->move(public_path('img'), $imageName);

        $event = Event::create([
            'name' => $request->name,
            'date' => $request->date,
            'image' => 'img/' . $imageName,
            'description' => $request->description
        ]);

        return response()->json($event, 201);
    }

    public function show($id)
    {
        $event = Event::find($id);
        return response()->json($event, 200);
    }

    public function update(StoreEventRequest $request, $id)
    {
        $event = Event::find($id);

        if ($request->hasFile('image')) {

            if ($event->image) {
                $oldImagePath = public_path($event->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('img'), $imageName);
            $event->image = 'img/' . $imageName;
        }

        $event->name = $request->name;
        $event->date = $request->date;
        $event->description = $request->description;

        $event->save();

        return response()->json($event, 200);
    }

    public function destroy($id)
    {
        $event = Event::find($id);

        $imagePath = $event->image;


        if (file_exists($imagePath)) {
            unlink($imagePath);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted']);
    }
}
