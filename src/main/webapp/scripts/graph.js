let graphElement, graph;

function graphEntry() {
    graphElement = document.getElementById("graph");
    graph = Desmos.GraphingCalculator(graphElement, {
        keypad: false,
        expressions: false,
        zoomFit: false,
        settingsMenu: false,
        invertedColors: true,
        xAxisLabel: 'x',
        yAxisLabel: 'y',
        xAxisStep: 1,
        yAxisStep: 1,
        xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE
    });
    graphElement.addEventListener('click', handleClick);
    graphElement.addEventListener('mousemove', ev => {
        graphElement.moved = true;
    });
    graphElement.addEventListener('mousedown', ev => {
        graphElement.moved = false;
    });
    setBounds(3);
}

const color = '#ff7000'; //'#008cff';

function makeGraph(r) {
    graph.setExpression({
        id: '1',
        latex: `-${r}/2<=y<=0 \\{0<=x<=${r}\\}`,
        color: color,
        lines: false
    });
    graph.setExpression({
        id: '2',
        latex: `0<=y<=2x+${r} \\{x<=0\\}`,
        color: color,
        lines: false
    });
    graph.setExpression({
        id: '3',
        latex: `x^2+y^2<=${r}^2 \\{x>=0\\} \\{y>=0\\}`,
        color: color,
        lines: false
    });

}

function drawPoint(x, y) {
    graph.setExpression({
        id: '4',
        latex: `(${x}, ${y})`,
        color: '#00bbbb',
        lines: false
    });
}

function setBounds(r) {
    let bounds = r*2;
    graph.setMathBounds({
        left: -bounds,
        right: bounds,
        bottom: -bounds,
        top: bounds
    });
}

function handleClick(ev) {
    if(graphElement.moved) return;

    let rect = graphElement.getBoundingClientRect();
    let x = ev.clientX - rect.left;
    let y = ev.clientY - rect.top;
    let mathCoordinates = graph.pixelsToMath({x, y});

    if (!inRectangle(mathCoordinates, graph.graphpaperBounds.mathCoordinates)) return;
    x = +mathCoordinates.x.toFixed(2);
    y = +mathCoordinates.y.toFixed(2);

    if(last_r_button === undefined) {
        borderRed("r-cell");
        return;
    }

    drawPoint(x, y);
    checkHit(x, y, +last_r_button.value);
}

function inRectangle(point, rect) {
    return (
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y <= rect.top &&
        point.y >= rect.bottom
    )
}