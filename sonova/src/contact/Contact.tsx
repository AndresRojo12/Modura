import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, Zoom, toast } from "react-toastify";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebook,
  FaXTwitter,
  FaSpotify,
  FaSoundcloud,
} from "react-icons/fa6";

export default function Contact() {
  interface LinkItem {
    platform: string;
    url: string;
  }

  interface FormPayload {
    name: string;
    lastName: string;
    email: string;
    category: string;
    artistName: string;
    sealNAME: string;
    musicPlatform: LinkItem[];
    yourSocials: LinkItem[];
    message: string;
  }

  interface FormState {
    payload: FormPayload;
  }

  const [form, setForm] = useState<FormState>({
    payload: {
      name: "",
      lastName: "",
      email: "",
      category: "",
      artistName: "",
      sealNAME: "",
      musicPlatform: [],
      yourSocials: [],
      message: "",
    },
  });

  const { t, i18n } = useTranslation("contact.translation");
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const musicPlatforms = [
    {
      name: "Spotify",
      icon: <FaSpotify className="text-green-500 text-2xl" />,
    },
    {
      name: "SoundCloud",
      icon: <FaSoundcloud className="text-orange-500 text-2xl" />,
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-red-600 text-2xl" />,
    },
  ];

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: <FaInstagram className="text-pink-500 text-2xl" />,
    },
    { name: "TikTok", icon: <FaTiktok className="text-black text-2xl" /> },
    
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-2xl" />,
    },
    { name: "X", icon: <FaXTwitter className="text-black text-2xl" /> },
  ];

  // Agregar plataforma musical
  const addMusic = () => {
    setForm({
      ...form,
      payload: {
        ...form.payload,
        musicPlatform: [
          ...form.payload.musicPlatform,
          { platform: "", url: "" },
        ],
      },
    });
  };

  // Actualizar campo
  const updateMusic = (index: number, field: keyof LinkItem, value: string) => {
    const updated = [...form.payload.musicPlatform];
    updated[index][field] = value;

    setForm({
      ...form,
      payload: { ...form.payload, musicPlatform: updated },
    });
  };

  // Eliminar
  const removeMusic = (index: number) => {
    const updated = form.payload.musicPlatform.filter((_, i) => i !== index);
    setForm({
      ...form,
      payload: { ...form.payload, musicPlatform: updated },
    });
  };

  const addSocial = () => {
    setForm({
      ...form,
      payload: {
        ...form.payload,
        yourSocials: [...form.payload.yourSocials, { platform: "", url: "" }],
      },
    });
  };

  const updateSocial = (
    index: number,
    field: keyof LinkItem,
    value: string
  ) => {
    const updated = [...form.payload.yourSocials];
    updated[index][field] = value;

    setForm({
      ...form,
      payload: { ...form.payload, yourSocials: updated },
    });
  };

  const removeSocial = (index: number) => {
    const updated = form.payload.yourSocials.filter((_, i) => i !== index);
    setForm({
      ...form,
      payload: { ...form.payload, yourSocials: updated },
    });
  };

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      payload: {
        ...prevForm.payload,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const socialsFormatted = form.payload.yourSocials
      .map((s) => `<p><strong>${s.platform}:</strong> ${s.url}</p>`)
      .join("");

    const musicFormatted = form.payload.musicPlatform
      .map((m) => `<p><strong>${m.platform}:</strong> ${m.url}</p>`)
      .join("");

    const payload = {
      ...form.payload,
      yourSocials: socialsFormatted,
      musicPlatform: musicFormatted,
    };

    if (!payload.name || !payload.email || !payload.message) {
      toast.error(t("contact.status_required"));
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL_BACKEND}contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error(t("contact.status_form_error"));

      toast.success(t("contact.notification_mail"));

      setForm({
        payload: {
          name: "",
          lastName: "",
          email: "",
          category: "",
          artistName: "",
          sealNAME: "",
          musicPlatform: [],
          yourSocials: [],
          message: "",
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(t("contact.status_error"));
    }
  };

  const clearForm = () => {
    setForm({
      payload: {
        name: "",
        lastName: "",
        email: "",
        category: "",
        artistName: "",
        sealNAME: "",
        musicPlatform: [],
        yourSocials: [],
        message: "",
      },
    });
  };

  const isSubmitDisabled = Object.values(form.payload).every((value) => {
    if (Array.isArray(value)) return value.length === 0;
    return value.trim() === "";
  });

  return (
    <>
      <header className="w-full px-10 py-6 fixed top-0 left-0 bg-violet-100 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto flex justify-end">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={i18n.language}
            className="bg-indigo-500 shadow-lg shadow-indigo-500/50 bg-white border rounded px-3 py-1 text-black"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </div>
      </header>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-10">
          <h1 className="text-4xl font-bold text-center mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-center text-gray-600 mb-10">
            {t("contact.subtitle")}
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block mb-2 font-medium">
                {t("contact.name")}
              </label>
              <input
                type="text"
                name="name"
                value={form.payload.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-300 "
                placeholder={t("contact.name_placeholder")}
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="block mb-2 font-medium">
                {t("contact.lastName")}
              </label>
              <input
                type="text"
                name="lastName"
                value={form.payload.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-300"
                placeholder={t("contact.lastName_placeholder")}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">
                {t("contact.email")}
              </label>
              <input
                type="email"
                name="email"
                value={form.payload.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-300"
                placeholder={t("contact.email_placeholder")}
              />
            </div>

            {/* Categoría (texto por ahora) */}
            <div>
              <label className="block mb-2 font-medium ">
                {t("contact.category")}
              </label>
              <select
                name="category"
                value={form.payload.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="">{t("contact.category_placeholder")}</option>
                <option value="Artista">{t("contact.category_artist")}</option>
                <option value="Sello">{t("contact.category_labelName")}</option>
              </select>
            </div>

            {/*Dinamismo en categoria*/}

            {form.payload.category === "Artista" && (
              <div>
                <label className="block mb-2 font-medium">
                  {t("contact.artistName")}
                </label>
                <input
                  type="text"
                  name="artistName"
                  value={form.payload.artistName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder={t("contact.artistName_placeholder")}
                />
              </div>
            )}

            {form.payload.category === "Sello" && (
              <div>
                <label className="block mb-2 font-medium">
                  {t("contact.labelName")}
                </label>
                <input
                  type="text"
                  name="sealNAME"
                  value={form.payload.sealNAME}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder={t("contact.labelName_placeholder")}
                />
              </div>
            )}

            {/* Nombre del sello */}
            {/* <div>
            <label className="block mb-2 font-medium">Nombre del sello</label>
            <input
              type="text"
              name="sealNAME"
              value={form.sealNAME}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Ej: Modura Records"
            />
          </div> */}

            {/* Plataformas musicales */}
            <div className="mt-8">
              <label className="block mb-2 font-medium">
                {t("contact.musicPlatforms")}
              </label>

              <div className="space-y-4">
                {form.payload.musicPlatform.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg"
                  >
                    {/* Selector de plataforma */}
                    <select
                      value={item.platform}
                      onChange={(e) =>
                        updateMusic(index, "platform", e.target.value)
                      }
                      className="border p-2 rounded-lg"
                    >
                      <option value="">
                        {t("contact.musicPlatforms_select")}
                      </option>
                      {musicPlatforms.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>

                    {/* Input URL */}
                    <input
                      type="url"
                      placeholder="https://..."
                      className="flex-1 border p-2 rounded-lg"
                      value={item.url}
                      onChange={(e) =>
                        updateMusic(index, "url", e.target.value)
                      }
                    />

                    {/* Botón eliminar */}
                    <button
                      onClick={() => removeMusic(index)}
                      type="button"
                      className="text-red-500 font-bold"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>

              {/* Botón agregar */}
              <button
                type="button"
                onClick={addMusic}
                className="mt-3 bg-white text-gray px-3 py-2 rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/50"
              >
                {t("contact.musicPlatforms_add")}
              </button>
            </div>

            {/* Vista previa íconos */}
            <div className="flex gap-4 mt-4">
              {form.payload.musicPlatform.map((s, index) => {
                const platform = musicPlatforms.find(
                  (p) => p.name === s.platform
                );

                if (!platform || !s.url) return null;

                return (
                  <a
                    key={index}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platform.icon}
                  </a>
                );
              })}
            </div>

            {/* Redes Sociales */}
            <div>
              <label className="block mb-2 font-medium">
                {t("contact.socials")}
              </label>

              {/* Lista de redes agregadas */}
              <div className="space-y-4">
                {form.payload.yourSocials.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg"
                  >
                    {/* Selector de plataforma */}
                    <select
                      value={item.platform}
                      onChange={(e) =>
                        updateSocial(index, "platform", e.target.value)
                      }
                      className="border p-2 rounded-lg"
                    >
                      <option value="">{t("contact.socials_select")}</option>
                      {socialPlatforms.map((p) => (
                        <option key={p.name} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                    </select>

                    {/* Input URL */}
                    <input
                      type="url"
                      placeholder="https://..."
                      className="flex-1 border p-2 rounded-lg"
                      value={item.url}
                      onChange={(e) =>
                        updateSocial(index, "url", e.target.value)
                      }
                    />

                    {/* Botón eliminar */}
                    <button
                      onClick={() => removeSocial(index)}
                      type="button"
                      className="text-red-500 font-bold"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>

              {/* Botón para agregar red */}
              <button
                type="button"
                onClick={addSocial}
                className="mt-3 bg-white text-gray px-3 py-2 rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/50"
              >
                {t("contact.socials_add")}
              </button>
            </div>

            {/* Vista previa íconos */}
            <div className="flex gap-4 mt-4">
              {form.payload.yourSocials.map((s, index) => {
                const platform = socialPlatforms.find(
                  (p) => p.name === s.platform
                );

                if (!platform || !s.url) return null;

                return (
                  <a
                    key={index}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platform.icon}
                  </a>
                );
              })}
            </div>

            {/* Mensaje */}
            <div>
              <label className="block mb-2 font-medium">
                {t("contact.message")}
              </label>
              <textarea
                name="message"
                value={form.payload.message}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-300"
                placeholder={t("contact.message_placeholder")}
              ></textarea>
            </div>

            {/* Botón */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full  py-3 rounded-lg font-semibold transition
                ${
                  isSubmitDisabled
                    ? "bg-gray-200 cursor-not-allowed text-white"
                    : "bg-violet-600 hover:bg-violet-700 text-white"
                }
              `}
              >
                {t("contact.submit")}
              </button>
              <button
                type="button"
                onClick={clearForm}
                className="border px-3 py-2 rounded-md bg-white-500 shadow-lg shadow-white-500/50 text-gray-500 font-semibold"
              >
                {t("contact.clear")}
              </button>
            </div>
          </form>

          {status && (
            <p className="text-center mt-6 text-green-600 font-medium">
              {status}
            </p>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" />
      {/* FOOTER */}
      <footer className="text-center py-14 bg-white text-gray mt-20">
        © {new Date().getFullYear()} Modura Distribution - {t("contact.rights")}
      </footer>
    </>
  );
}
