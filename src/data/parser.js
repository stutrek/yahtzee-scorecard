import { Parser, SUPPORTED_FORMULAS } from 'hot-formula-parser';
const parser = new Parser();

function calculateBox(box) {
    if (box.type === 4) {
        const shouldShow = box.calculateIf ? parser.parse(box.calculateIf).result : true;
        if (shouldShow === false) {
            return null;
        } else {
            const result = parser.parse(box.formula).result;
            return result === undefined ? null : result;
        }
    } else {
        return box.points === undefined ? null : box.points;
    }
}

parser.on(
    'callCellValue',
    function(cellCoord, done) {
        if (!this.player) {
            throw new Error('No player');
        }
        if (cellCoord.column.index !== 0) {
            throw new RangeError('Only the A column is supported');
        }
        if (cellCoord.row.index >= this.player.boxes.length) {
            throw new RangeError('Index too high');
        }
        done(calculateBox(this.player, this.player.boxes[cellCoord.row.index]));
    }.bind(parser)
);
parser.on(
    'callRangeValue',
    function(startCellCoord, endCellCoord, done) {
        if (!this.player) {
            throw new Error('No player');
        }

        var fragment = [];

        for (var row = startCellCoord.row.index; row <= endCellCoord.row.index; row++) {
            const box = this.player.boxes[row];
            fragment.push(calculateBox(this.player, box));
        }

        done([fragment]);
    }.bind(parser)
);

parser.setFunction(
    'PREFS',
    function(params) {
        if (this.preferences === undefined || params[0] === undefined) {
            return '#NOPREF!';
        }
        const key = params[0].toString();
        if (key in this.preferences) {
            return this.preferences[key];
        }
        return '#NOPREF!';
    }.bind(parser)
);

window.parser = parser;
window.SUPPORTED_FORMULAS = SUPPORTED_FORMULAS;

export default parser;
