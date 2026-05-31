<?php

declare(strict_types=1);

require_once __DIR__ . '/src/helpers.php';

$firstNumber = 14;
$secondNumber = 5;
$calculationResult = calculateBySigns($firstNumber, $secondNumber);

pageStart('Задача 1');
?>
<?= backLink() ?>
<section class="panel">
    <p class="label">Задача 1</p>
    <h1>Работа с переменными и условиями</h1>
    <p class="muted">
        Если оба числа положительные, выводится разность. Если оба отрицательные, выводится произведение.
        Если знаки разные, выводится сумма.
    </p>
    <ul class="result-list">
        <li><code>$firstNumber</code> = <?= $firstNumber ?></li>
        <li><code>$secondNumber</code> = <?= $secondNumber ?></li>
        <li>Результат: <strong><?= $calculationResult ?></strong></li>
    </ul>
</section>
<?php pageEnd(); ?>

