<?php

declare(strict_types=1);

require_once __DIR__ . '/src/helpers.php';

$base = 2;
$exponent = 3;
$powerResult = powerRecursive($base, $exponent);

pageStart('Задача 6');
?>
<?= backLink() ?>
<section class="panel">
    <p class="label">Задача 6</p>
    <h1>Рекурсивное возведение в степень</h1>
    <p class="output">
        <?= $base ?><sup><?= $exponent ?></sup> = <strong><?= $powerResult ?></strong>
    </p>
</section>
<?php pageEnd(); ?>

