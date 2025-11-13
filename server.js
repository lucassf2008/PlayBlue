import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import jsonServer from "json-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve arquivos estáticos (front) da pasta public
app.use(express.static(path.join(__dirname, "public")));

// --- json-server ---
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// json-server nas rotas raiz (ex: /usuarios)
app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use(router);

// fallback para index.html (opcional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🌸 RomanceFlix rodando na porta ${port}`));
