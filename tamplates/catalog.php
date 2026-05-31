<main class="panel">
    <p class="eyebrow">Каталог</p>
    <h1>Фрукты</h1>

    <div class="catalog-grid">
        <?php foreach ($products as $product): ?>
            <article class="product-card">
                <img src="img/<?= htmlspecialchars($product['image'], ENT_QUOTES, 'UTF-8') ?>" alt="">
                <h2><?= htmlspecialchars($product['name'], ENT_QUOTES, 'UTF-8') ?></h2>
                <p><?= (int) $product['price'] ?> руб.</p>
                <button type="button">Купить</button>
            </article>
        <?php endforeach; ?>
    </div>
</main>

