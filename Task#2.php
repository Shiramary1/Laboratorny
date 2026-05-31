<?php

declare(strict_types=1);

require_once __DIR__ . '/src/helpers.php';

$startNumber = random_int(0, 15);
$numberLine = implode(', ', collectNumbersToFifteen($startNumber));

pageStart('Задача 2');
?>
<?= backLink() ?>
<section class="panel">
    <p class="label">Задача 2</p>
    <h1>Вывод чисел от выбранного значения до 15</h1>
    <p class="muted">
        Значение выбирается случайно, а последовательность формируется через конструкцию <code>switch</code>.
    </p>
    <ul class="result-list">
        <li>Начальное число: <strong><?= $startNumber ?></strong></li>
        <li>Полученная последовательность: <strong><?= $numberLine ?></strong></li>
    </ul>
</section>
<?php pageEnd(); ?>

