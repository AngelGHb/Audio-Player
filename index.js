    import express from "express";
    import bodyParser from "body-parser";

    const app = express();
    const port = process.env.PORT || 3000;

    app.set('view engine', 'ejs');
    app.set('views', './views'); // or use an absolute path if needed

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));

    app.get('/', (req,res) => {
        res.render('index.ejs')
    })

    app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    });
