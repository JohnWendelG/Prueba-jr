<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    public function index()
    {
        return response()->json(Usuario::orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'identificacion'   => 'required|string|max:20|unique:usuarios,identificacion',
            'nombre_usuario'   => 'required|string|max:50|unique:usuarios,nombre_usuario',
            'apellidos'        => 'required|string|max:100',
            'nombres'          => 'required|string|max:100',
            'fecha_nacimiento' => 'required|date',
            'celular'          => 'required|string|max:20',
            'telefono'         => 'nullable|string|max:20',
            'correo_personal'  => 'required|email|max:150|unique:usuarios,correo_personal',
            'estado_civil'     => 'required|string|max:30',
            'sexo'             => 'required|string|max:20',
            'direccion'        => 'required|string|max:255',
        ]);

        return response()->json(Usuario::create($data), 201);
    }

    public function show(string $id)
    {
        return response()->json(Usuario::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $usuario = Usuario::findOrFail($id);

        $data = $request->validate([
            'identificacion'   => ['required','string','max:20', Rule::unique('usuarios','identificacion')->ignore($usuario->id)],
            'nombre_usuario'   => ['required','string','max:50', Rule::unique('usuarios','nombre_usuario')->ignore($usuario->id)],
            'apellidos'        => 'required|string|max:100',
            'nombres'          => 'required|string|max:100',
            'fecha_nacimiento' => 'required|date',
            'celular'          => 'required|string|max:20',
            'telefono'         => 'nullable|string|max:20',
            'correo_personal'  => ['required','email','max:150', Rule::unique('usuarios','correo_personal')->ignore($usuario->id)],
            'estado_civil'     => 'required|string|max:30',
            'sexo'             => 'required|string|max:20',
            'direccion'        => 'required|string|max:255',
        ]);

        $usuario->update($data);

        return response()->json($usuario);
    }

    public function destroy(string $id)
    {
        Usuario::findOrFail($id)->delete();
        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }
}
