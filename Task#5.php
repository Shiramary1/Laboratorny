<?php

declare(strict_types=1);

require_once __DIR__ . '/src/helpers.php';

$currentYears = [
    'date("Y")' => date('Y'),
    'strftime-like через формат даты' => date_format(date_create(), 'Y'),
    'DateTimeImmutable' => (new DateTimeImmutable())->format('Y'),
];

pageStart('Задача 5');
?>
<?= backLink() ?>
<section class="panel">
    <p class="label">Задача 5</p>
    <h1>Текущий год разными способами</h1>
    <ul class="result-list">
        <?php foreach ($currentYears as $method => $year): ?>
            <li><?= htmlspecialchars($method, ENT_QUOTES, 'UTF-8') ?>: <strong><?= $year ?></strong></li>
        <?php endforeach; ?>
    </ul>
</section>
<?php pageEnd(); ?>

