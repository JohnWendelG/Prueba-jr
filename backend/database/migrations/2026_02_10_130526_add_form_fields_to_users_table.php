<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->string('identificacion', 20)->nullable();
        $table->string('username', 50)->nullable();
        $table->string('apellidos', 100)->nullable();
        $table->string('nombres', 100)->nullable();
        $table->date('fecha_nacimiento')->nullable();
        $table->string('celular', 20)->nullable();
        $table->string('telefono', 20)->nullable();
        $table->string('correo_personal')->nullable();
        $table->string('estado_civil', 30)->nullable();
        $table->string('sexo', 10)->nullable();
        $table->string('direccion', 255)->nullable();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn([
            'identificacion','username','apellidos','nombres','fecha_nacimiento',
            'celular','telefono','correo_personal','estado_civil','sexo','direccion'
        ]);
    });
}
};
