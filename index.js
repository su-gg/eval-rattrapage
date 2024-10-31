import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

/** Récupération du nom de fichier et du répertoire
 *  @type {String} */
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/**
 * Configuration du serveur et de l'adresse IP.
 * @type {number}
 */
const port = 8070;
const host = "127.0.0.1";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(dirname, "public")));

app.use(
  "/favicon.ico",
  express.static(path.join(dirname, "public", "images", "favicon.png")),
);

/**
 * Route pour la page d'accueil.
 * Sert le fichier 'index.html' comme page principale.
 *
 * @param {object} _req - L'objet de requête (non utilisé).
 * @param {object} res - L'objet de réponse.
 * @param {function} next - Fonction de passage d'erreur.
 */
app.get("/", (_req, res, next) => {
  return res.sendFile("index.html", { root: path.join(dirname) }, (err) => {
    if (err) {
      return next(err);
    }
  });
});

/**
 * Route pour récupérer un point de fraîcheur spécifique en fonction de l'ID.
 * Envoie une requête GET à une API externe pour obtenir les données d'îlots de fraîcheur.
 *
 * @async
 * @param {object} req - L'objet de requête contenant les paramètres.
 * @param {object} res - L'objet de réponse pour envoyer les données.
 * @param {function} next - Fonction de passage d'erreur.
 */
app.get("/freshpoint/:id", async (req, res, next) => {
  const freshPointIdParam = req.params.id;
  try {
    const response = await fetch(
      `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-equipements-activites/records?limit=100`,
      { method: "GET", headers: { "Content-Type": "application/json" } },
    );
    if (response) {
      const { results } = await response.json();
      return res.json({ data: results[freshPointIdParam] });
    }
  } catch (error) {
    return next(error);
  }
});

/**
 * Route POST pour recevoir un commentaire et le renvoyer.
 *
 * @param {object} req - L'objet de requête contenant les données du commentaire.
 * @param {object} res - L'objet de réponse pour envoyer le commentaire reçu.
 * @param {function} next - Fonction de passage d'erreur.
 */
app.post("/comment", (req, res, next) => {
  if (!req.body) {
    return next(err);
  }
  const comment = req.body.message;
  return res.send(comment);
});

/**
 * Middleware de gestion globale des erreurs.
 *
 * @param {object} err - L'objet d'erreur capturé.
 * @param {object} req - L'objet de requête.
 * @param {object} res - L'objet de réponse.
 * @param {function} next - Fonction pour continuer à la prochaine middleware.
 */
app.get((err, req, res, next) => {
  console.error(err);
});

/**
 * Démarrage du serveur sur le port défini et l'adresse hôte.
 */
app.listen(port, host, () => {
  console.info(`Server started @ http://${host}:${port}.`);
});
