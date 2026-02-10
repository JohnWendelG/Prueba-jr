<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';

    protected $fillable = [
        'identificacion',
        'nombre_usuario',
        'apellidos',
        'nombres',
        'fecha_nacimiento',
        'celular',
        'telefono',
        'correo_personal',
        'estado_civil',
        'sexo',
        'direccion',
    ];
}
