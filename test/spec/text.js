var testable = require('x-bubbles/text');
var zws = require('x-bubbles/zws');

describe('x-bubbles/text', function () {
    beforeEach(function () {
        this.selection = window.getSelection();
        this.selection.removeAllRanges();

        this.buffer = document.body.appendChild(document.createElement('div'));
    });

    afterEach(function () {
        this.buffer.parentNode.removeChild(this.buffer);
        delete this.buffer;
        delete this.selection;
    });

    describe('#arrowRight', function () {
        it('должен сдвинуть курсор на 1 позицию вправо', function () {
            var t1 = this.buffer.appendChild(document.createTextNode('123'));

            var range = document.createRange();
            range.setStart(t1, 0);
            range.setEnd(t1, 0);

            this.selection.addRange(range);

            var res = testable.arrowRight(this.selection);

            expect(this.selection.focusOffset).to.be.eql(1);
            expect(this.selection.focusNode).to.be.eql(t1);
            expect(res).to.be.eql(true);
        });

        it('должен схлопнуть выделение справа', function () {
            var t1 = this.buffer.appendChild(document.createTextNode('1'));

            var range = document.createRange();
            range.setStart(t1, 0);
            range.setEnd(t1, 1);

            this.selection.addRange(range);

            var res = testable.arrowRight(this.selection);

            expect(this.selection.focusOffset).to.be.eql(1);
            expect(this.selection.focusNode).to.be.eql(t1);
            expect(res).to.be.eql(true);
        });

        it('выделение налево должен схлопнуть справа если нод больше', function () {
            var t1 = this.buffer.appendChild(document.createTextNode('12345'));
            var t2 = this.buffer.appendChild(document.createTextNode('67890'));

            var range = document.createRange();
            range.setStart(t2, 2);
            range.setEnd(t1, 3);

            this.selection.addRange(range);

            var res = testable.arrowRight(this.selection);

            expect(this.selection.focusOffset).to.be.eql(4);
            expect(this.selection.focusNode).to.be.eql(t1);
            expect(res).to.be.eql(true);
        });

        it('выделение налево должен схлопнуть справа если нод больше', function () {
            var t1 = this.buffer.appendChild(document.createTextNode('12345'));

            var range = document.createRange();
            range.setStart(t1, 4);
            range.setEnd(t1, 3);

            this.selection.addRange(range);

            var res = testable.arrowRight(this.selection);

            expect(this.selection.focusOffset).to.be.eql(4);
            expect(this.selection.focusNode).to.be.eql(t1);
            expect(res).to.be.eql(true);
        });

        it('при достижении конца надо, выделить начало следующей текстовой ноды', function () {
            var t1 = this.buffer.appendChild(document.createTextNode('1'));
            var t2 = this.buffer.appendChild(document.createTextNode('2'));

            var range = document.createRange();
            range.setStart(t1, 1);
            range.setEnd(t1, 1);

            this.selection.addRange(range);

            var res = testable.arrowRight(this.selection);

            expect(this.selection.focusOffset).to.be.eql(1);
            expect(this.selection.focusNode).to.be.eql(t2);
            expect(res).to.be.eql(true);
        });

        it('непечатный символ в тексте пропускается', function () {
            var zwsText = zws.createElement();
            var t1 = this.buffer.appendChild(document.createTextNode('1' + zwsText.nodeValue + '2'));

            var range = document.createRange();
            range.setStart(t1, 1);
            range.setEnd(t1, 1);

            this.selection.addRange(range);

            var res = testable.arrowRight(this.selection);

            expect(this.selection.focusOffset).to.be.eql(3);
            expect(this.selection.focusNode).to.be.eql(t1);
            expect(res).to.be.eql(true);
        });

        it('непечатные символы пропускаются в конце и начале нод', function () {
            var zwsText = zws.createElement();
            var t1 = this.buffer.appendChild(document.createTextNode('1' + zwsText.nodeValue + zwsText.nodeValue));
            var t2 = this.buffer.appendChild(document.createTextNode(zwsText.nodeValue + zwsText.nodeValue + '2'));

            var range = document.createRange();
            range.setStart(t1, 1);
            range.setEnd(t1, 1);

            this.selection.addRange(range);

            var res = testable.arrowRight(this.selection);

            expect(this.selection.focusOffset).to.be.eql(3);
            expect(this.selection.focusNode).to.be.eql(t2);
            expect(res).to.be.eql(true);
        });

        it('при достижении конца текста возвращается false и селект не меняется', function () {
            var t1 = this.buffer.appendChild(document.createTextNode('1'));

            var range = document.createRange();
            range.setStart(t1, 1);
            range.setEnd(t1, 1);

            this.selection.addRange(range);

            var res = testable.arrowRight(this.selection);

            expect(this.selection.focusOffset).to.be.eql(1);
            expect(this.selection.focusNode).to.be.eql(t1);
            expect(res).to.be.eql(false);
        });

        it('достижение конца считается, если после идут ноды и/или текст с непечатными символами', function () {
            var zwsText = zws.createElement();
            var t1 = this.buffer.appendChild(document.createTextNode('1' + zwsText.nodeValue + zwsText.nodeValue));
            this.buffer.appendChild(document.createTextNode(zwsText.nodeValue + zwsText.nodeValue));

            var range = document.createRange();
            range.setStart(t1, 1);
            range.setEnd(t1, 1);

            this.selection.addRange(range);

            var res = testable.arrowRight(this.selection);

            expect(this.selection.focusOffset).to.be.eql(1);
            expect(this.selection.focusNode).to.be.eql(t1);
            expect(res).to.be.eql(false);
        });

        it('если выделен не текст, то селект не изменяется и возвращается false', function () {
            var t1 = this.buffer.appendChild(document.createElement('div'));
            var t2 = this.buffer.appendChild(document.createElement('div'));

            var range = document.createRange();
            range.setStart(t1, 0);
            range.setEnd(t2, 0);

            this.selection.addRange(range);

            var res = testable.arrowRight(this.selection);

            expect(this.selection.focusOffset).to.be.eql(0);
            expect(this.selection.focusNode).to.be.eql(document.body);
            expect(res).to.be.eql(false);
        });
    });
});
