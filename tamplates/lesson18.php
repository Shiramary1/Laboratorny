<main class="panel">
    <p class="eyebrow">Задания</p>
    <h1>Практика с массивами, циклами и строками</h1>

    <?php if ($selectedTask === 'all' || $selectedTask === 'numbers'): ?>
        <section class="task-block">
            <h2>Числа от 0 до 10</h2>
            <div class="result-list">
                <?php foreach ($numberRows as $row): ?>
                    <p>
                        <strong><?= $row['number'] ?></strong>
                        &mdash; <?= htmlspecialchars($row['text'], ENT_QUOTES, 'UTF-8') ?>.
                    </p>
                <?php endforeach; ?>
            </div>
        </section>
    <?php endif; ?>

    <?php if ($selectedTask === 'all' || $selectedTask === 'regions'): ?>
        <section class="task-block">
            <h2>Области и города</h2>
            <?php foreach ($regions as $region => $cities): ?>
                <p>
                    <strong><?= htmlspecialchars($region, ENT_QUOTES, 'UTF-8') ?>:</strong>
                    <?= htmlspecialchars(implode(', ', $cities), ENT_QUOTES, 'UTF-8') ?>.
                </p>
            <?php endforeach; ?>
        </section>
    <?php endif; ?>

    <?php if ($selectedTask === 'all' || $selectedTask === 'translit'): ?>
        <section class="task-block">
            <h2>Транслитерация</h2>
            <form class="translit-form" method="post" action="index.php?page=lesson18&task=translit">
                <label for="text">Введите текст на русском:</label>
                <textarea id="text" name="text" rows="5"><?= htmlspecialchars($sourceText, ENT_QUOTES, 'UTF-8') ?></textarea>
                <button type="submit">Преобразовать</button>
            </form>

            <?php if ($translitText !== ''): ?>
                <div class="translit-result">
                    <?= nl2br(htmlspecialchars($translitText, ENT_QUOTES, 'UTF-8')) ?>
                </div>
            <?php endif; ?>
        </section>
    <?php endif; ?>

    <?php if ($selectedTask === 'all' || $selectedTask === 'filtered'): ?>
        <section class="task-block">
            <h2>Города на букву К</h2>
            <?php foreach ($filteredRegions as $region => $cities): ?>
                <p>
                    <strong><?= htmlspecialchars($region, ENT_QUOTES, 'UTF-8') ?>:</strong>
                    <?= htmlspecialchars(implode(', ', $cities), ENT_QUOTES, 'UTF-8') ?>.
                </p>
            <?php endforeach; ?>
        </section>
    <?php endif; ?>
</main>

