<?php

$pageTitle = "Lesson 16 | PHP";
$mainHeading = "Добро пожаловать на мой сайт";
$subHeading = "Моя первая лабораторная работа по PHP";
$currentYear = date("Y");

function getPluralWord(int $value, string $one, string $few, string $many): string
{
    $mod100 = $value % 100;
    $mod10 = $value % 10;

    if ($mod100 >= 11 && $mod100 <= 14) {
        return $many;
    }

    if ($mod10 === 1) {
        return $one;
    }

    if ($mod10 >= 2 && $mod10 <= 4) {
        return $few;
    }

    return $many;
}

function getCurrentTimeWithWords(): string
{
    $hours = (int) date("G");
    $minutes = (int) date("i");

    $hoursWord = getPluralWord($hours, "час", "часа", "часов");
    $minutesWord = getPluralWord($minutes, "минута", "минуты", "минут");

    return sprintf("%d %s %d %s", $hours, $hoursWord, $minutes, $minutesWord);
}

?>
<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $pageTitle; ?></title>
    <link rel="stylesheet" href=".styles/styles.css">
</head>
<body>
    <main class="page">
        <section class="card">
            <p class="eyebrow">Задание 1</p>
            <h1><?= $mainHeading; ?></h1>
            <p class="lead"><?= $subHeading; ?></p>
            <p class="text">
                Эта страница сгенерирована на PHP с использованием переменных и встроенных функций.
            </p>
        </section>

        <section class="card">
            <p class="eyebrow">Задание 2</p>
            <h2>Текущее время</h2>
            <p class="time-value"><?= getCurrentTimeWithWords(); ?></p>
            <p class="text">
                Склонение слов для часов и минут рассчитывается автоматически.
            </p>
        </section>
    </main>

    <footer class="footer">
        &copy; <?= $currentYear; ?> Учебный проект по PHP
    </footer>
</body>
</html>
