require('window.requestanimationframe');
const documentSize = require('get-document-size');

const flakes = [];
const deletedFlakes = [];
const updateParams = {};
let root;
let rafUpdate;
let rafGenerate;
let documentWidth;
let documentHeight;
let classNameSnowflow;
let countFlakesInSecons;
let countFlakeTypes;
let flakeWidth;
let flakeHeight;

export const init = (options = {}) => {
    switch (typeof options.element) {
        case "object":
            root = options.element;
            break;
        case "string":
            root = document.querySelector(options.element);
            break;
        default:
            root = document.querySelector(".moonSugar");
    }

    classNameSnowflow = options.classNameSnowflow || "moonSugar-item";
    countFlakesInSecons = options.countFlakesInSecons || 5;
    countFlakeTypes = options.countFlakeTypes || 1;

    documentWidth = documentSize.width();
    documentHeight = documentSize.height();

    root.style.width = `${documentWidth}px`;
    root.style.height = `${documentHeight}px`;

    window.onresize = window.onload = () => {
        root.style.width = 'auto';
        root.style.height = 'auto';

        documentWidth = documentSize.width();
        documentHeight = documentSize.height();

        root.style.width = `${documentWidth}px`;
        root.style.height = `${documentHeight}px`;
    };

    startGenerate(countFlakesInSecons);

    update();
};

const startGenerate = fps => {
    updateParams.fpsInterval = 1000 / fps;
    updateParams.then = Date.now();
    updateParams.startTime = updateParams.then;

    generate();
};

const generate = () => {
    rafGenerate = requestAnimationFrame(generate);

    updateParams.now = Date.now();
    updateParams.elapsed = updateParams.now - updateParams.then;

    if (updateParams.elapsed > updateParams.fpsInterval) {
        updateParams.then = updateParams.now - (updateParams.elapsed % updateParams.fpsInterval);

        if (deletedFlakes.length) {
            flakes[deletedFlakes[0]] = {
                ...flakes[deletedFlakes[0]],
                active: true,
                x: Math.floor(Math.random() * documentWidth),
                y: 0,
                vx: (Math.random() - 0.5) * 5,
                vy: 2 + Math.random() * 2,
                dx: 2 + Math.random(),
                counter: 0,
                coef: (Math.random() * (0.1 - 0.05) + 0.05) / 2
            };
            deletedFlakes.shift();
        } else {
            const newFlake = {
                active: true,
                x: Math.floor(Math.random() * documentWidth),
                y: 0,
                vx: (Math.random() - 0.5) * 5,
                vy: 2 + Math.random() * 2,
                dx: 2 + Math.random(),
                counter: 0,
                coef: (Math.random() * (0.1 - 0.05) + 0.05) / 2
            };

            root.insertAdjacentHTML('beforeend', `<div class="${classNameSnowflow}" data-type="${Math.floor(Math.random() * countFlakeTypes)}" style="transform: (${Math.round(newFlake.x)}px, ${Math.round(newFlake.y)}px)"></div>`);

            newFlake.DOM = root.lastElementChild;

            flakes.push(newFlake);

            if (!flakeWidth) {
                flakeWidth = newFlake.DOM.clientWidth;
                flakeHeight = newFlake.DOM.clientHeight;
            }
        }
    }
};

const update = () => {
    flakes.forEach((element, index) => {
        if (element.active && Math.random() > 0.2) {
            element.y += element.vy;
            element.counter++;

            if (element.y > documentHeight + flakeHeight * 2) {
                element.active = false;
                deletedFlakes.push(index);
            } else {
                element.x += element.vx + Math.cos(element.counter * element.coef) * element.dx;

                if (element.x > -flakeWidth * 2 && element.x < documentWidth + flakeWidth * 2) {
                    element.DOM.style.transform = `translate(${element.x}px, ${element.y}px)`;
                }
            }
        }
    });

    rafUpdate = requestAnimationFrame(update);
};
