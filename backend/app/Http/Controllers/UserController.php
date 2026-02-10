<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()
    {
        return User::orderByDesc('id')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'identificacion'   => 'nullable|string|max:20',
            'username'         => 'nullable|string|max:50',
            'apellidos'        => 'nullable|string|max:100',
            'nombres'          => 'nullable|string|max:100',
            'fecha_nacimiento' => 'nullable|date',
            'celular'          => 'nullable|string|max:20',
            'telefono'         => 'nullable|string|max:20',
            'correo_personal'  => 'nullable|email|max:255',
            'estado_civil'     => 'nullable|string|max:30',
            'sexo'             => 'nullable|string|max:10',
            'direccion'        => 'nullable|string|max:255',
        ]);

        $name = trim(($data['nombres'] ?? '') . ' ' . ($data['apellidos'] ?? ''));
        if ($name === '') $name = $data['username'] ?? 'Usuario';

        $email = $data['correo_personal'] ?? null;
        if (!$email) {
            $base = $data['username'] ?? ($data['identificacion'] ?? 'user');
            $email = $base . '+' . Str::random(6) . '@local.test';
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make(Str::random(16)),
            ...$data,
        ]);

        return response()->json($user, 201);
    }

    public function show(User $user)
    {
        return $user;
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'identificacion'   => 'nullable|string|max:20',
            'username'         => 'nullable|string|max:50',
            'apellidos'        => 'nullable|string|max:100',
            'nombres'          => 'nullable|string|max:100',
            'fecha_nacimiento' => 'nullable|date',
            'celular'          => 'nullable|string|max:20',
            'telefono'         => 'nullable|string|max:20',
            'correo_personal'  => 'nullable|email|max:255',
            'estado_civil'     => 'nullable|string|max:30',
            'sexo'             => 'nullable|string|max:10',
            'direccion'        => 'nullable|string|max:255',
        ]);

        if (isset($data['correo_personal'])) {
            $user->email = $data['correo_personal'];
        }

        if (isset($data['nombres']) || isset($data['apellidos'])) {
            $name = trim(($data['nombres'] ?? $user->nombres ?? '') . ' ' . ($data['apellidos'] ?? $user->apellidos ?? ''));
            if ($name !== '') $user->name = $name;
        }

        $user->fill($data);
        $user->save();

        return $user;
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['ok' => true]);
    }
}
