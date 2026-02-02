import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Contact from "./contact/Contact.tsx";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebook,
  FaXTwitter,
  FaSpotify,
  FaSoundcloud,
  FaDeezer,
} from "react-icons/fa6";

// importacion de iconos

import {
  SiApplemusic,
  SiBeatport,
  SiShazam,
} from "react-icons/si";

function App() {
  const { t, i18n } = useTranslation();

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

    {
      name: "Deezer",
      icon: <FaDeezer className="text-green-600 text-2xl" />,
    },

    {
      name: "Apple Music",
      icon: <SiApplemusic className="text-gray-900 text-2xl" />,
    },
    {
      name: "Beatport",
      icon: <SiBeatport className="text-blue-700 text-2xl" />,
    },

    {
      name: "Juno Download",
      img: <img src="descarga.png" alt="Juno Download" className="h-8 w-8" />,
    },

    {
      name: "Shazam",
      icon: <SiShazam className="text-blue-500 text-2xl" />,
    },

    {
      name: "Traxsource",
      img: <img src="trx.png" alt="Traxsource" className="h-8 w-8" />,
    }
    
  ];

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/"
            element={
              <>
                {/* HEADER */}
                <header className="w-full px-10 py-0 fixed top-0 left-0 bg-violet-100 backdrop-blur-md border-b border-gray-200 z-50">
                  <div className="max-w-6xl mx-auto flex items-center justify-between">
                    {/* LOGO */}
                    <div className="flex items-center gap-3 text-7xl font-bold">
                      <img
                        src="/MODURA Copia.png"
                        alt="Modura Logo"
                        className="h-21 w-auto"
                      />
                    </div>
                    {/* MENU */}
                    <nav className="flex space-x-8 text-[15px] font-medium text-gray-900">
                      <a href="#servicio" className="hover:text-black">
                        {t("menu.service")}
                      </a>
                      <a href="#costos" className="hover:text-black">
                        {t("menu.costs")}
                      </a>
                      <a href="#beneficios" className="hover:text-black">
                        {t("menu.benefits")}
                      </a>
                      <a href="#socios" className="hover:text-black">
                        {t("menu.partners")}
                      </a>
                    </nav>

                    {/* CTA */}
                    <Link
                      to="/contact"
                      className="line-block bg-violet-500 shadow-lg shadow-indigo-500/50 hover:bg-violet-900 text-white px-5 py-2 rounded-md font-semibold transition"
                    >
                      {t("menu.apply")}
                    </Link>
                    <div className="flex items-center gap-3 text-sm">
                      <a href="" className="hover:underline">
                        {t("menu.login")}
                      </a>
                    </div>

                    <select
                      onChange={(e) => changeLanguage(e.target.value)}
                      defaultValue={i18n.language}
                      className="bg-white border rounded px-3 py-1 text-black bg-indigo-500 shadow-lg shadow-indigo-500/50 "
                    >
                      <option value="es">ES</option>
                      <option value="en">EN</option>
                    </select>
                  </div>
                </header>

                {/* HERO */}
                <section className="w-full pt-[160px] pb-32 text-center from-gray-50 to-green-50">
                  <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <h1 className="text-6xl md:text-6xl font-bold leading-tight">
                      {t("hero.title")}
                    </h1>

                    <p className="text-gray-600 text-lg mt-6 max-w-xl mx-auto text-center">
                      {t("hero.text")}
                    </p>
                  </div>
                </section>
                <div className="h-px bg-gray-300 mt-8"></div>

                {/* SERVICIO */}
                <section id="servicio" className="max-w-4xl mx-auto px-6 py-10">
                  <h2 className="text-3xl font-semibold mb-4 ">
                    {t("service.title")}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t("service.text")}
                  </p>
                </section>

                {/* COSTOS */}
                <section id="costos" className="max-w-4xl mx-auto px-6 py-1">
                  <h2 className="text-3xl font-semibold mb-4">
                    {t("costs.title")}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    <b>{t("costs.commission")}</b>
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {t("costs.noFees")}{" "}
                  </p>
                </section>

                {/* BENEFICIOS */}
                <section
                  id="beneficios"
                  className="max-w-6xl mx-auto px-6 py-10"
                >
                  <h2 className="text-3xl font-semibold">
                    {t("benefits.title")}
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 shadow-indigo-500/50">
                    {t("benefits.cards", { returnObjects: true }).map(
                      (card, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg shadow-indigo-400/50"
                        >
                          <h3 className="text-lg font-bold">{card.title}</h3>
                          <p className="text-gray-600 mt-2">{card.text}</p>
                        </div>
                      ),
                    )}
                  </div>
                </section>

                {/* ANALISIS Y REPORTES */}
                <section
                  id="beneficios"
                  className="max-w-6xl mx-auto px-6 py-10"
                >
                  <h2 className="text-3xl font-semibold">
                    {t("analytics.title")}
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {t("analytics.text")}
                  </p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 shadow-indigo-500/50">
                    {/* CARD */}
                    {t("analytics.cards", { returnObjects: true }).map(
                      (card, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg shadow-indigo-400/50"
                        >
                          <h3 className="text-lg font-bold">{card.title}</h3>
                          <p className="text-gray-600 mt-2">{card.text}</p>
                        </div>
                      ),
                    )}
                  </div>
                </section>

                {/* PAGOS Y REGALIAS */}
                <section
                  id="beneficios"
                  className="max-w-6xl mx-auto px-6 py-10"
                >
                  <h2 className="text-3xl font-semibold">
                    {t("royalties.title")}
                  </h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 shadow-indigo-500/50">
                    {/* CARD */}
                    {t("royalties.cards", { returnObjects: true }).map(
                      (card, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg shadow-indigo-400/50"
                        >
                          <h3 className="text-lg font-bold">{card.title}</h3>
                          <p className="text-gray-600 mt-2">{card.text}</p>
                        </div>
                      ),
                    )}
                  </div>
                </section>

                <section id="servicio" className="max-w-4xl mx-auto px-6 py-10">
                  <h2 className="text-3xl font-semibold mb-4">
                    {t("applications.title")}
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t("applications.text")}

                    <b> {t("applications.b")}</b>
                  </p>
                </section>

                {/* SOCIOS */}
                <section id="socios" className="max-w-6xl mx-auto px-6 py-10">
                  <h2 className="text-3xl font-semibold">
                    {t("partners.title")}
                  </h2>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
                    {musicPlatforms.map((platform, index) => (
                      <div
                        key={index} 
                        className="flex items-center gap-3 mt-6"
                      >
                        {platform.icon ? platform.icon : platform.img}
                        <span className="text-gray-700 text-lg">
                          {platform.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-12 text-gray-700 text-sm">
                    {[
                      "7Digital",
                      "Aarmy",
                      "Amanotes",
                      "Amazon",
                      "AMI",
                      "Anghami",
                      "Apple Music",
                      "Apple Music 1",
                      "Audalize",
                      "Audible Magic",
                      "Audiomack",
                      "AWA",
                      "Beatport",
                      "Beatsource",
                      "BMAT",
                      "Boomplay",
                      "Canva",
                      "ClaroMusica",
                      "CLMBR",
                      "Clone Digital",
                      "Coda",
                      "Deezer",
                      "Echelon",
                      "eMusic",
                      "Flo",
                      "Global",
                      "GTL",
                      "iHeartRadio",
                      "Instagram",
                      "iTunes",
                      "JPAY",
                      "Juno Download",
                      "KKBOX",
                      "Lime Blue",
                      "LINE Music",
                      "Melon",
                      "Meta",
                      "Mixcloud",
                      "Mood Media",
                      "Music Reports",
                      "Napster",
                      "Netease",
                      "Pandora",
                      "Peloton",
                      "Pretzel",
                      "Resident Advisor",
                      "Rockbot",
                      "ROXi",
                      "Saavn",
                      "Shazam",
                      "Singa",
                      "Snapchat",
                      "SoundCloud",
                      "SoundExchange",
                      "Soundtrack Your Brand",
                      "Spotify",
                      "Tencent",
                      "Tidal",
                      "TikTok",
                      "TouchTunes",
                      "Traxsource",
                      "Trebel",
                      "United Media Agency",
                      "Yandex",
                      "YouTube Content Monetization",
                      "YouTube Premium",
                    ].map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>

                {/* FOOTER */}
                <div className="w-full flex justify-center mt-8">
                  <div className="h-48 w-96 flex items-center justify-center">
                    <img
                      className="object-contain"
                      src="/MODURA Copia.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-10 text-gray-700 text-sm max-w-4xl mx-auto">
                  <div>
                    {[
                      "Santa Rosa de Osos, Antioquia",
                      "CO",
                    ].map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <div className="text-right">
                    {[
                      "Contact:",
                      "minnusrecords@gmail.com",
                      "+57 3215770546"
                    ].map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
                <footer className="text-center py-14 bg-white text-gray mt-20">
                  © {new Date().getFullYear()} Modura Distribution -{" "}
                  {t("footer.rights")}
                </footer>
              </>
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
