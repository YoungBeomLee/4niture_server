const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require("./models");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); //이부분 경로 확인
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/products", (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "ASC"]], //order 설정변경가능
    attributes: ["id", "name", "price", "category", "imageUrl", "size", "desc", "createdAt"],
  })
    .then((result) => {
      console.log("product 조회결과:", result);
      res.send({ products: result });
    })
    .catch((err) => {
      console.error(err);
      res.send("에러발생");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id } = params;
  models.Product.findOne({
    where: { id: id },
  })
    .then((result) => {
      console.log("조회결과:", result);
      res.send({
        product: result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품조회시 에러가 발생 했습니다.");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl: file.path,
  });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, price, category, imageUrl, size, desc } = body;
  if (!name || !price || !category || !imageUrl || !size || !desc) {
    res.send("모든 필드를 입력해주세요");
  }
  models.Product.create({
    name,
    price,
    category,
    imageUrl,
    size,
    desc,
  })
    .then((result) => {
      console.log("상품생성결과:", result);
      res.send({ result });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 업로드에 문제가 발생했습니다.");
    });
  //res.send({ body });
});

app.listen(port, () => {
    console.log("🚩4niture의 쇼핑몰 서버가 돌아가고 있습니다");
    models.sequelize
      .sync()
      .then(() => {
        console.log("👌 DB 연결 성공");
      })
      .catch(function (err) {
        console.error(err);
        console.log("😰 DB 연결 에러");
        process.exit();
      });
  });
  
  //method: post, /login 로그인이 완료되었습니다
  app.post("/login", (req, res) => {
    res.send("로그인이 완료되었습니다");
  });
  