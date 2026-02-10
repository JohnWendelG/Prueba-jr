import { useState } from "react";
import { createUser } from "./api";

const initialForm = {
  identificacion: "",
  username: "",
  apellidos: "",
  nombres: "",
  fecha_nacimiento: "",
  celular: "",
  telefono: "",
  correo_personal: "",
  estado_civil: "",
  sexo: "",
  direccion: "",
};

export default function UserForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    // validación mínima rápida
    if (!form.identificacion || !form.username || !form.apellidos || !form.nombres) {
      setMsg("Completa: identificación, usuario, apellidos y nombres.");
      return;
    }

    try {
      setLoading(true);
      await createUser(form); // requiere endpoint /api/users
      setMsg("Guardado OK ✅");
      setForm(initialForm);
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 border rounded-lg p-4">
      <h2 className="text-xl font-bold">Formulario</h2>

      {msg && (
        <div className="mt-3 text-sm border rounded px-3 py-2">
          {msg}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border rounded px-3 py-2" name="identificacion" placeholder="Identificación"
          value={form.identificacion} onChange={handleChange} />

        <input className="border rounded px-3 py-2" name="username" placeholder="Nombre de usuario"
          value={form.username} onChange={handleChange} />

        <input className="border rounded px-3 py-2" name="apellidos" placeholder="Apellidos"
          value={form.apellidos} onChange={handleChange} />

        <input className="border rounded px-3 py-2" name="nombres" placeholder="Nombres"
          value={form.nombres} onChange={handleChange} />

        <input className="border rounded px-3 py-2" type="date" name="fecha_nacimiento"
          value={form.fecha_nacimiento} onChange={handleChange} />

        <input className="border rounded px-3 py-2" name="celular" placeholder="Celular"
          value={form.celular} onChange={handleChange} />

        <input className="border rounded px-3 py-2" name="telefono" placeholder="Teléfono"
          value={form.telefono} onChange={handleChange} />

        <input className="border rounded px-3 py-2" type="email" name="correo_personal" placeholder="Correo personal"
          value={form.correo_personal} onChange={handleChange} />

        <select className="border rounded px-3 py-2" name="estado_civil" value={form.estado_civil} onChange={handleChange}>
          <option value="">Estado civil</option>
          <option value="Soltero">Soltero</option>
          <option value="Casado">Casado</option>
          <option value="Divorciado">Divorciado</option>
          <option value="Viudo">Viudo</option>
          <option value="Union de hecho">Unión de hecho</option>
        </select>

        <select className="border rounded px-3 py-2" name="sexo" value={form.sexo} onChange={handleChange}>
          <option value="">Sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <input className="border rounded px-3 py-2 md:col-span-2" name="direccion" placeholder="Dirección o ubicación"
          value={form.direccion} onChange={handleChange} />

        <div className="md:col-span-2 flex gap-2">
          <button disabled={loading} className="px-4 py-2 rounded bg-black text-white disabled:opacity-50">
            {loading ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" className="px-4 py-2 rounded border" onClick={() => setForm(initialForm)}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}
