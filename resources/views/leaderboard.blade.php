<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Leaderboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f0f8ff;
            padding: 50px;
        }
        h2 {
            margin-bottom: 20px;
        }
        ol {
            list-style: none;
            padding: 0;
            max-width: 300px;
            margin: 0 auto;
        }
        li {
            background: #e6f7ff;
            margin: 10px 0;
            padding: 10px;
            border-radius: 8px;
            font-size: 18px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .back-btn {
            background: #70c5ce;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h2>Leaderboard</h2>

    @if (count($scores) > 0)
        <ol>
            @foreach ($scores as $score)
                <li>{{ $score->name }} - {{ $score->score }} pts</li>
            @endforeach
        </ol>
    @else
        <p>No scores yet. Be the first to play!</p>
    @endif

    <button class="back-btn" onclick="window.location.href='{{ route('dashboard') }}'">Back</button>

    <script src="{{ asset('js/flappy.js') }}"></script>
</body>
</html>
