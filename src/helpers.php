<?php

declare(strict_types=1);

function pageStart(string $title): void
{
    ?>
    <!doctype html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></title>
        <link rel="stylesheet" href="src/assets/styles/style.css">
    </head>
    <body>
    <main class="layout">
    <?php
}

function pageEnd(): void
{
    ?>
    </main>
    </body>
    </html>
    <?php
}

function backLink(): string
{
    return '<a class="back-link" href="index.html">К списку задач</a>';
}

function calculateBySigns($left, $right)
{
    if ($left >= 0 && $right >= 0) {
        return $left - $right;
    }

    if ($left < 0 && $right < 0) {
        return $left * $right;
    }

    return $left + $right;
}

function collectNumbersToFifteen(int $start): array
{
    $numbers = [];

    switch ($start) {
        case 0: $numbers[] = 0;
        case 1: $numbers[] = 1;
        case 2: $numbers[] = 2;
        case 3: $numbers[] = 3;
        case 4: $numbers[] = 4;
        case 5: $numbers[] = 5;
        case 6: $numbers[] = 6;
        case 7: $numbers[] = 7;
        case 8: $numbers[] = 8;
        case 9: $numbers[] = 9;
        case 10: $numbers[] = 10;
        case 11: $numbers[] = 11;
        case 12: $numbers[] = 12;
        case 13: $numbers[] = 13;
        case 14: $numbers[] = 14;
        case 15: $numbers[] = 15;
            break;
        default:
            throw new InvalidArgumentException('Начальное число должно быть от 0 до 15.');
    }

    return $numbers;
}

function sumValues($left, $right)
{
    return $left + $right;
}

function subtractValues($left, $right)
{
    return $left - $right;
}

function multiplyValues($left, $right)
{
    return $left * $right;
}

function divideValues($left, $right)
{
    return $right == 0 ? 'Деление на ноль невозможно' : $left / $right;
}

function runMathOperation($left, $right, string $operation)
{
    switch ($operation) {
        case 'add':
            return sumValues($left, $right);
        case 'subtract':
            return subtractValues($left, $right);
        case 'multiply':
            return multiplyValues($left, $right);
        case 'divide':
            return divideValues($left, $right);
        default:
            return 'Неизвестная операция';
    }
}

function powerRecursive($base, int $exponent)
{
    if ($exponent < 0) {
        return 1 / powerRecursive($base, abs($exponent));
    }

    if ($exponent === 0) {
        return 1;
    }

    return $base * powerRecursive($base, $exponent - 1);
}
