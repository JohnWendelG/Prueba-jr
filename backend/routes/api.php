<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;

Route::apiResource('usuarios', UsuarioController::class);
