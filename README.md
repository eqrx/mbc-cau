# mbc-cau
Cards Against University is a project of the module "Moderne Browserkommunikation" of the Hamburg University of Applied Scienes

## Licence
This project is based on [Cards Against Humanity](https://cardsagainsthumanity.com).
Cards and gaming principle are under [Creative Commons BY-NC-SA 2.0 license](https://creativecommons.org/licenses/by-nc-sa/2.0/).
Everything else is licensed as GNU Affero General Public Licence Version 3.0. See LICENCE file or [here](https://www.gnu.org/licenses/agpl-3.0.en.html) for further information.

## Backend

### Required node.js

- winston: Logging
- socketio: WebSockets
- argv: Command line parsing
- shuffle-array: Randomizing order of lists
- path-is-absolute: Workaround for older systems

### How to run

 - Clone repository
 - Enter backend folder
 - Execute `node src/cau.js -c conf/cau.json -l info`

### Authors
- backend/ was contributed by Alexander Sowitzki and Katharina Mulack
