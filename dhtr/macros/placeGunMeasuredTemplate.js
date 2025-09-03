// change this to 'short', 'standard', 'long' for variants
const range = 'standard';


// don't touch below here unless you know what you are doing.

let ranges = {
    short: {
        distance: 300,
        angle: 53.14,
        type: 'cone'
    },
    standard: {
        distance: 700,
        angle: 53.14,
        type: 'cone'
    },
    long: {
        distance: 1000,
        angle: 33,
        type: 'cone'
    }
};

// really don't if you don't from here

class PlaceableTemplate extends foundry.canvas.placeables.MeasuredTemplate {
    #moveTime = 0;
    #hoveredToken;
    #initialLayer;
    #events;

    static fromData(distance) {
        const templateShape = ranges[range].type;
        const templateData = {
            t: templateShape,
            user: game.user.id,
            distance: ranges[range].distance,
            direction: 0,
            angle: ranges[range].angle,
            x: 0,
            y: 0,
            fillColor: game.user.color,
        }
        const cls = CONFIG.MeasuredTemplate.documentClass;
        const template = new cls(foundry.utils.deepClone(templateData), { parent: canvas.scene });
        return new this(template);
    }

    drawPreview() {
        const initialLayer = canvas.activeLayer;
        this.draw();
        this.layer.activate();
        this.layer.preview.addChild(this);
        return this.activatePreviewListeners(initialLayer);
    }
    activatePreviewListeners(initialLayer) {
        return new Promise((resolve, reject) => {
            this.#initialLayer = initialLayer;
            this.#events = {
                cancel: this._onCancelPlacement.bind(this),
                confirm: this._onConfirmPlacement.bind(this),
                move: this._onMovePlacement.bind(this),
                resolve,
                reject,
                rotate: this._onRotatePlacement.bind(this)
            };

            // Activate listeners
            canvas.stage.on("mousemove", this.#events.move);
            canvas.stage.on("mouseup", this.#events.confirm);
            canvas.app.view.oncontextmenu = this.#events.cancel;
            canvas.app.view.onwheel = this.#events.rotate;
        });
    }
    async _finishPlacement(event) {
        this.layer._onDragLeftCancel(event);
        canvas.stage.off("mousemove", this.#events.move);
        canvas.stage.off("mouseup", this.#events.confirm);
        canvas.app.view.oncontextmenu = null;
        canvas.app.view.onwheel = null;
        if (this.#hoveredToken) {
            this.#hoveredToken._onHoverOut(event);
            this.#hoveredToken = null;
        }
        this.#initialLayer.activate();
        await this.actorSheet?.maximize();
    }

    _onMovePlacement(event) {
        event.stopPropagation();
        const now = Date.now(); // Apply a 20ms throttle
        if (now - this.#moveTime <= 20) return;
        const center = event.data.getLocalPosition(this.layer);
        const updates = this.getSnappedPosition(center);
        this.document.updateSource(updates);
        this.refresh();
        this.#moveTime = now;
    }

    _onRotatePlacement(event) {
        if (event.ctrlKey) event.preventDefault(); // Avoid zooming the browser window
        event.stopPropagation();
        const delta = canvas.grid.type > CONST.GRID_TYPES.SQUARE ? 30 : 15;
        const snap = event.shiftKey ? delta : 5;
        const update = { direction: this.document.direction + (snap * Math.sign(event.deltaY)) };
        this.document.updateSource(update);
        this.refresh();
    }

    async _onConfirmPlacement(event) {
        await this._finishPlacement(event);
        const destination = canvas.templates.getSnappedPoint({ x: this.document.x, y: this.document.y });
        this.document.updateSource(destination);
        this.#events.resolve(canvas.scene.createEmbeddedDocuments("MeasuredTemplate", [this.document.toObject()]));
    }

    async _onCancelPlacement(event) {
        await this._finishPlacement(event);
        this.#events.reject();
    }

}

const template = PlaceableTemplate.fromData(6);
await template.drawPreview();
