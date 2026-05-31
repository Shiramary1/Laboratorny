<?php

declare(strict_types=1);

require_once __DIR__ . '/src/helpers.php';

$examples = [
    '5 + 3' => sumValues(5, 3),
    '5 - 3' => subtractValues(5, 3),
    '5 * 3' => multiplyValues(5, 3),
    '6 / 3' => divideValues(6, 3),
    '6 / 0' => divideValues(6, 0),
];

pageStart('Задача 3');
?>
<?= backLink() ?>
<section class="panel">
    <p class="label">Задача 3</p>
    <h1>Арифметические функции</h1>
    <p class="muted">Для каждой операции используется отдельная функция.</p>
    <ul class="result-list">
        <?php foreach ($examples as $expression => $value): ?>
            <li><?= $expression ?> = <strong><?= $value ?></strong></li>
        <?php endforeach; ?>
    </ul>
</section>
<?php pageEnd(); ?>

