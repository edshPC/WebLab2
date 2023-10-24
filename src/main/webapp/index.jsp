<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>WebLab2</title>
  <script src="https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>

<table id="main-table">
  <tr>
    <td colspan="3" id="header">
      <div class="container">
        <p>Лабораторная работа #2</p>
        <p>Выполнил Щербинин Эдуард P3214</p>
        <p>Вариант 2477</p>
      </div>
    </td>
  </tr>
  <tr>
    <td>
      <div class="container">
        <table id="input-table">
          <tr>
            <td colspan="3" class="input-cell-l">Введи значения:</td>
          </tr>
          <tr>
            <td class="input-cell-l">X:</td>
            <td id="x-cell">
              <table id="x-table" class="">
                <tr>
                  <td>
                    <button class="x-button rounded" value="-5">-5</button>
                  </td>
                  <td class="button">
                    <button class="x-button rounded" value="-4">-4</button>
                  </td>
                  <td class="button">
                    <button class="x-button rounded" value="-3">-3</button>
                  </td>
                </tr>
                <tr>
                  <td class="button">
                    <button class="x-button rounded" value="-2">-2</button>
                  </td>
                  <td class="button">
                    <button class="x-button rounded" value="-1">-1</button>
                  </td>
                  <td class="button">
                    <button class="x-button rounded" value="0">0</button>
                  </td>
                </tr>
                <tr>
                  <td class="button">
                    <button class="x-button rounded" value="1">1</button>
                  </td>
                  <td class="button">
                    <button class="x-button rounded" value="2">2</button>
                  </td>
                  <td class="button">
                    <button class="x-button rounded" value="3">3</button>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td class="input-cell-l">Y:</td>
            <td id="y-cell">
              <input class="input-select rounded box" id="y-select" name="y-select" placeholder="(-5; 5)"
                     required type="text"/>
            </td>
          </tr>
          <tr>
            <td class="input-cell-l">R:</td>
            <td id="r-cell">
              <table id="r-table" class="">
                <tr>
                  <td>
                    <button class="r-button rounded" value="1">1</button>
                  </td>
                  <td class="button">
                    <button class="r-button rounded" value="2">2</button>
                  </td>
                  <td class="button">
                    <button class="r-button rounded" value="3">3</button>
                  </td>
                </tr>
                <tr>
                  <td class="button">
                    <button class="r-button rounded" value="4">4</button>
                  </td>
                  <td class="button">
                    <button class="r-button rounded" value="5">5</button>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <button id="submit-button" class="rounded">Вычислить</button>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <button id="clear-button" class="rounded">Очистить</button>
            </td>
          </tr>
        </table>
      </div>
    </td>
    <td>
      <div class="container rounded" id="graph-container">
        <div id="graph"></div>
      </div>
    </td>
    <td>
      <div class="container">
        <table id="result-table">
          <tr id="first-row" class="last-row-hit">
            <td>X</td>
            <td>Y</td>
            <td>R</td>
            <td>Результат</td>
            <td>Время</td>
            <td>Время вычисления</td>
          </tr>

        </table>
      </div>
    </td>
  </tr>
</table>


<script src="scripts/requestSender.js"></script>
<script src="scripts/dataProcess.js"></script>
<script src="scripts/graph.js"></script>
</body>
</html>