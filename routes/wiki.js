const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const { main, addPage, editPage, wikiPage } = require('../views');

router.get('/', async (req, res, next) => {
    try {
        const pages = await Page.findAll();
        res.send(main(pages));
      } catch (error) {
          next(error)
        }
})

router.post('/', async (req, res, next) => {
    // res.send('got to POST /wiki/');

    try {
        const [user, wasCreated] = await User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        })

        const page = await Page.create(req.body);

        await page.setAuthor(user);

        res.redirect('/wiki/' + page.slug);

    } catch (error) {
        next(error)
    }
    

    router.post('/:slug', async (req, res, next) => {
        try {
            const [updatedRowCount, updatedPages] = await Page.update(req.body, {
                where: {
                  slug: req.params.slug
                },
                returning: true
              });
          
              res.redirect("/wiki/" + updatedPages[0].slug);

        } catch(error) {
            next(error);
        }
    })

    // const page = new Page({
    //     title: req.body.title,
    //     content: req.body.content,
    //     name: req.body.name,
    //     email: req.body.email,
    //     status: req.body.status,
    // })

});

router.get('/add', async (req, res, next) => {
    res.send(addPage());
})

router.get("/:slug", async (req, res, next) => {
    try {
      const page = await Page.findOne({
        where: {
          slug: req.params.slug
        }
      });
      if (page === null) {
        res.sendStatus(404);
      } else {
        const author = await page.getAuthor();
        res.send(wikiPage(page, author));
      }
    } catch (error) { next(error) }
  });

router.get("/:slug/edit", async (req, res, next) => {
    try {
        const page = await Page.findOne({
        where: {
            slug: req.params.slug
        }
        });

        if (page === null) {
        res.sendStatus(404);
        } else {
        const author = await page.getAuthor();
        res.send(editPage(page, author));
        }
    } catch (error) { next(error) }
});

module.exports = router;