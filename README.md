# biobulkbende.org

> [biobulkbende.org](https://biobulkbende.org)

Our public website made by members.

## Hacking

- Make sure you have installed `git`, `node` (v14 LTS) and `npm`
- Clone this repo: `git clone https://github.com/biobulkbende/biobulkbende.org`
- From within the folder install all packages: `npm install`
- Run gulp for automation: `gulp watch`

## Deployment

(You need to be a member of the systems workgroup to do this).

```
make
```

## Structure

The website is served from the folder `/app`. The folder `/assets` is only for
development while the folder `/bundle` contains the files linked to
`index.html` and `/en/index.html`

### HTML

There are two pages:

- `index.html` (Dutch)
- `/en/index.html` (English)

Changes to the text can be done directly to these files without having to run
any automation.

### (S)CSS

The CSS files to be changed are stored in /assets/scss which contains:

- `/base` (global CSS declarations)
- `/modules` (specific CSS declarations)

The CSS is written in SCSS and after changing it must be compiled and bundled
together. The command `gulp watch` runs automation and make sure that when you
save the change in automatic everything is compiled and bundled. The final file
is stored in `/bundle/styles` and provide the CSS to `index.html` and
`/en/index.html`.

### JS

The JS files to be changed are stored in `assets/js/modules`. The JS is written
in ES6 and after changing it must be compiled in ES5 and bundled together. The
command `gulp watch` runs automation and make sure that when you save the
change in automatic everything is compiled and bundled. The final file is
stored in `/bundle/scripts` and provide the JS to `index.html` and
`/en/index.html`.

### Media

The media are stored in `/assets/media` containing:

- Icons
- Fonts
- Images

Icons are compressed in a sprite through the command `gulp icons`. (This is
complicated as it generates a single sprite with all the icons together and a
CSS which points at the right icon in the sprite). After this command
automation for the CSS must be run.

Images are minified through the command `gulp images`. All the media are copied
with the command `gulp copyMediaInBundle` (it also minified the images) into
the folder `/bundle/media` which provide the media to `index.html` and
`/en/index.html`.

If you want to change an Image you have to put it in `/assets/media/images` and
run `gulp copyMediaInBundle`. The html must refer to the image that has been
copied and minified in `/bundle/media/images`.

### Video

The video is stored on vimeo.
