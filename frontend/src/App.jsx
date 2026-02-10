import { useEffect, useState } from "react";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "./api";
import "./App.css";

const initialForm = {
  identificacion: "",
  nombre_usuario: "",
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

function normalizeUsuario(u) {
  return {
    id: u.id,
    identificacion: u.identificacion ?? "",
    nombre_usuario: u.nombre_usuario ?? "",
    apellidos: u.apellidos ?? "",
    nombres: u.nombres ?? "",
    fecha_nacimiento: (u.fecha_nacimiento ?? "").toString().slice(0, 10),
    celular: u.celular ?? "",
    telefono: u.telefono ?? "",
    correo_personal: u.correo_personal ?? "",
    estado_civil: u.estado_civil ?? "",
    sexo: u.sexo ?? "",
    direccion: u.direccion ?? "",
  };
}

function validate(form) {
  const errors = {};

  const requiredFields = [
    "identificacion",
    "nombre_usuario",
    "apellidos",
    "nombres",
    "fecha_nacimiento",
    "celular",
    "correo_personal",
    "estado_civil",
    "sexo",
    "direccion",
  ];

  requiredFields.forEach((field) => {
    if (!String(form[field] || "").trim()) {
      errors[field] = "Campo obligatorio";
    }
  });

  if (form.correo_personal) {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo_personal);
    if (!emailOk) errors.correo_personal = "Correo inválido";
  }

  if (form.celular && !/^\d{7,15}$/.test(form.celular)) {
    errors.celular = "Debe tener solo números (7-15 dígitos)";
  }

  if (form.telefono && form.telefono.trim() !== "" && !/^\d{7,15}$/.test(form.telefono)) {
    errors.telefono = "Debe tener solo números (7-15 dígitos)";
  }

  return errors;
}

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function loadUsuarios() {
    setLoading(true);
    setApiError("");
    try {
      const data = await getUsuarios();
      setUsuarios(data.map(normalizeUsuario));
    } catch (error) {
      setApiError(error.message || "No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsuarios();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function resetForm() {
    setForm(initialForm);
    setErrors({});
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    setSuccessMsg("");

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      if (editingId) {
        await updateUsuario(editingId, form);
        setSuccessMsg("Usuario actualizado correctamente ✅");
      } else {
        await createUsuario(form);
        setSuccessMsg("Usuario creado correctamente ✅");
      }
      resetForm();
      await loadUsuarios();
    } catch (error) {
      setApiError(error.message || "Error al guardar");
    } finally {
      setSubmitting(false);
    }
  }

  function onEdit(user) {
    setEditingId(user.id);
    setForm({
      ...initialForm,
      ...user,
      fecha_nacimiento: (user.fecha_nacimiento || "").slice(0, 10),
    });
    setErrors({});
    setApiError("");
    setSuccessMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onDelete(id) {
    const ok = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!ok) return;

    setApiError("");
    setSuccessMsg("");
    try {
      await deleteUsuario(id);
      setSuccessMsg("Usuario eliminado correctamente ✅");

      if (editingId === id) resetForm();
      await loadUsuarios();
    } catch (error) {
      setApiError(error.message || "Error al eliminar");
    }
  }

  return (
    <div className="container">
      <h1>Gestión de Usuarios</h1>

      {successMsg && <div className="alert success">{successMsg}</div>}
      {apiError && <div className="alert error">{apiError}</div>}

      <form className="form-grid" onSubmit={handleSubmit}>
        <Field
          label="Identificación"
          name="identificacion"
          value={form.identificacion}
          onChange={handleChange}
          error={errors.identificacion}
        />
        <Field
          label="Nombre de usuario"
          name="nombre_usuario"
          value={form.nombre_usuario}
          onChange={handleChange}
          error={errors.nombre_usuario}
        />
        <Field
          label="Apellidos"
          name="apellidos"
          value={form.apellidos}
          onChange={handleChange}
          error={errors.apellidos}
        />
        <Field
          label="Nombres"
          name="nombres"
          value={form.nombres}
          onChange={handleChange}
          error={errors.nombres}
        />
        <Field
          label="Fecha de nacimiento"
          name="fecha_nacimiento"
          type="date"
          value={form.fecha_nacimiento}
          onChange={handleChange}
          error={errors.fecha_nacimiento}
        />
        <Field
          label="Celular"
          name="celular"
          value={form.celular}
          onChange={handleChange}
          error={errors.celular}
        />
        <Field
          label="Teléfono"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          error={errors.telefono}
        />
        <Field
          label="Correo personal"
          name="correo_personal"
          type="email"
          value={form.correo_personal}
          onChange={handleChange}
          error={errors.correo_personal}
        />

        <SelectField
          label="Estado civil"
          name="estado_civil"
          value={form.estado_civil}
          onChange={handleChange}
          error={errors.estado_civil}
          options={["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a", "Unión libre"]}
        />

        <SelectField
          label="Sexo"
          name="sexo"
          value={form.sexo}
          onChange={handleChange}
          error={errors.sexo}
          options={["Masculino", "Femenino", "Otro", "Prefiero no decir"]}
        />

        <div className="full">
          <label>Dirección o ubicación</label>
          <textarea
            name="direccion"
            rows={3}
            value={form.direccion}
            onChange={handleChange}
            placeholder="Ingresa la dirección..."
          />
          {errors.direccion && <small className="field-error">{errors.direccion}</small>}
        </div>

        <div className="full actions">
          <button type="submit" disabled={submitting}>
            {submitting
              ? "Guardando..."
              : editingId
              ? "Actualizar usuario"
              : "Crear usuario"}
          </button>

          {editingId && (
            <button type="button" className="secondary" onClick={resetForm}>
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <h2>Listado de usuarios</h2>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        <p>No hay registros todavía.</p>
      ) : (
        <div className="cards">
          {usuarios.map((u) => (
            <article className="card" key={u.id}>
              <h3>
                {u.nombres} {u.apellidos}
              </h3>
              <p><strong>ID:</strong> {u.identificacion}</p>
              <p><strong>Usuario:</strong> {u.nombre_usuario}</p>
              <p><strong>Nacimiento:</strong> {u.fecha_nacimiento || "-"}</p>
              <p><strong>Celular:</strong> {u.celular || "-"}</p>
              <p><strong>Teléfono:</strong> {u.telefono || "-"}</p>
              <p><strong>Correo:</strong> {u.correo_personal || "-"}</p>
              <p><strong>Estado civil:</strong> {u.estado_civil || "-"}</p>
              <p><strong>Sexo:</strong> {u.sexo || "-"}</p>
              <p><strong>Dirección:</strong> {u.direccion || "-"}</p>

              <div className="card-actions">
                <button onClick={() => onEdit(u)}>Editar</button>
                <button className="danger" onClick={() => onDelete(u.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />
      {error && <small className="field-error">{error}</small>}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, error }) {
  return (
    <div>
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        <option value="">Selecciona...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <small className="field-error">{error}</small>}
    </div>
  );
}
