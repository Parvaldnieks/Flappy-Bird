<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Flappy Bird</title>
    <style>
        canvas { display: block; margin: 100px auto; background: #70c5ce; }
    </style>
</head>
<body>
    <canvas id="flappyBird" width="500" height="700"></canvas>

    <div id="startScreen" style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 3px solid #222;
        border-radius: 10px;
        padding: 20px 30px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
        z-index: 999;
    ">
        <h2>Flappy Bird</h2>

        <label for="birdSkinSelector">Choose your Skin:</label>
        <select id="birdSkinSelector">
        <option value="/images/Yellow-Flappy-Bird.png">Classic</option>
        <option value="/images/Red-Flappy-Bird.png">Red Bird</option>
        <option value="/images/Blue-Flappy-Bird.png">Blue Bird</option>
        <option value="/images/Green-Flappy-Bird.png">Green Bird</option>
        </select>

        <p>Click Start to Play!</p>
        <button onclick="startGame()" style="
            padding: 10px 20px;
            font-size: 16px;
            background: #70c5ce;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: white;
        ">Start</button>
        <button id="backToDashboardBtn" onclick="goToDashboard()" style="
            padding: 10px 20px;
            font-size: 16px;
            background: #70c5ce;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: white;
        ">Back</button>
    </div>

    <div id="gameOverPopup" style="
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 3px solid #222;
        border-radius: 10px;
        padding: 20px 30px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
        z-index: 999;
    ">
        <h2>Game Over</h2>
        
        <p id="finalScore"></p>
        <button onclick="restartGame()" style="
            padding: 10px 20px;
            font-size: 16px;
            background: #70c5ce;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: white;
        ">Restart</button>

        <button onclick="goBackToStart()" style="
            padding: 10px 20px;
            font-size: 16px;
            background: #70c5ce;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            color: white;
        ">Back</button>
    </div>

    <script src="{{ asset('js/flappy.js') }}"></script>
</body>
</html>
