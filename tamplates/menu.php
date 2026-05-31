<nav class="main-nav" aria-label="Основное меню">
    <ul>
        <?php foreach ($menuItems as $item): ?>
            <li>
                <a href="<?= htmlspecialchars($item['url'], ENT_QUOTES, 'UTF-8') ?>">
                    <?= htmlspecialchars($item['title'], ENT_QUOTES, 'UTF-8') ?>
                </a>

                <?php if (!empty($item['children'])): ?>
                    <ul class="sub-nav">
                        <?php foreach ($item['children'] as $child): ?>
                            <li>
                                <a href="<?= htmlspecialchars($child['url'], ENT_QUOTES, 'UTF-8') ?>">
                                    <?= htmlspecialchars($child['title'], ENT_QUOTES, 'UTF-8') ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </li>
        <?php endforeach; ?>
    </ul>
</nav>

