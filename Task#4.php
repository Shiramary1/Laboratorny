<?php

declare(strict_types=1);

require_once __DIR__ . '/src/helpers.php';

$operationRows = [
    ['10 + 5', runMathOperation(10, 5, 'add')],
    ['10 - 5', runMathOperation(10, 5, 'subtract')],
    ['10 * 5', runMathOperation(10, 5, 'multiply')],
    ['10 / 5', runMathOperation(10, 5, 'divide')],
    ['10 ? 5', runMathOperation(10, 5, 'unknown')],
];

pageStart('Задача 4');
?>
<?= backLink() ?>
<section class="panel">
    <p class="label">Задача 4</p>
    <h1>Универсальная математическая операция</h1>
    <p class="muted">
        Функция получает два числа и название операции, затем вызывает нужное вычисление.
    </p>
    <ul class="result-list">
        <?php foreach ($operationRows as [$expression, $value]): ?>
            <li><?= $expression ?> = <strong><?= $value ?></strong></li>
        <?php endforeach; ?>
    </ul>
</section>
<?php pageEnd(); ?>

