<?php

declare(strict_types=1);

const TEMPLATE_DIR = __DIR__ . '/templates/';

$page = $_GET['page'] ?? 'home';
$viewData = [];

switch ($page) {
    case 'home':
        $viewName = 'home';
        $viewData['title'] = 'Главная';
        break;

    case 'catalog':
        $viewName = 'catalog';
        $viewData['title'] = 'Каталог';
        $viewData['products'] = getProducts();
        break;

    case 'about':
        $viewName = 'about';
        $viewData['title'] = 'О нас';
        $viewData['phone'] = '+7 900 123-45-67';
        break;

    case 'lesson18':
        $viewName = 'lesson18';
        $selectedTask = $_GET['task'] ?? 'all';
        $sourceText = trim($_POST['text'] ?? '');

        $viewData['title'] = 'Задания';
        $viewData['selectedTask'] = $selectedTask;
        $viewData['numberRows'] = $selectedTask === 'numbers' || $selectedTask === 'all' ? getNumberDescriptions() : [];
        $viewData['regions'] = $selectedTask === 'regions' || $selectedTask === 'all' ? getRegionList() : [];
        $viewData['filteredRegions'] = $selectedTask === 'filtered' || $selectedTask === 'all' ? getCitiesByFirstLetter('К') : [];
        $viewData['sourceText'] = $sourceText;
        $viewData['translitText'] = $sourceText !== '' ? transliterateText($sourceText) : '';
        break;

    case 'api-catalog':
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(getProducts(), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;

    default:
        http_response_code(404);
        $viewName = 'not-found';
        $viewData['title'] = 'Страница не найдена';
}

echo renderTemplate('layouts/main', [
    'title' => $viewData['title'],
    'menu' => renderTemplate('menu', ['menuItems' => getMenuItems()]),
    'content' => renderTemplate($viewName, $viewData),
]);

function renderTemplate(string $templateName, array $params = []): string
{
    extract($params, EXTR_SKIP);

    ob_start();
    include TEMPLATE_DIR . $templateName . '.php';
    return ob_get_clean();
}

function getMenuItems(): array
{
    return [
        ['title' => 'Главная', 'url' => 'index.php'],
        [
            'title' => 'Задания',
            'url' => 'index.php?page=lesson18',
            'children' => [
                ['title' => 'Числа', 'url' => 'index.php?page=lesson18&task=numbers'],
                ['title' => 'Регионы', 'url' => 'index.php?page=lesson18&task=regions'],
                ['title' => 'Транслит', 'url' => 'index.php?page=lesson18&task=translit'],
                ['title' => 'Города на К', 'url' => 'index.php?page=lesson18&task=filtered'],
            ],
        ],
        ['title' => 'Каталог', 'url' => 'index.php?page=catalog'],
        ['title' => 'О нас', 'url' => 'index.php?page=about'],
    ];
}

function getProducts(): array
{
    return [
        ['name' => 'Яблоко', 'price' => 24, 'image' => 'apple.svg'],
        ['name' => 'Банан', 'price' => 31, 'image' => 'banana.svg'],
        ['name' => 'Апельсин', 'price' => 46, 'image' => 'orange.svg'],
    ];
}

function getNumberDescriptions(): array
{
    $rows = [];
    $number = 0;

    do {
        if ($number === 0) {
            $text = 'это ноль';
        } elseif ($number % 2 === 0) {
            $text = 'четное число';
        } else {
            $text = 'нечетное число';
        }

        $rows[] = ['number' => $number, 'text' => $text];
        $number++;
    } while ($number <= 10);

    return $rows;
}

function getRegionList(): array
{
    return [
        'Московская область' => ['Москва', 'Зеленоград', 'Клин'],
        'Ленинградская область' => ['Санкт-Петербург', 'Всеволожск', 'Павловск', 'Кронштадт'],
        'Рязанская область' => ['Рязань', 'Касимов', 'Скопин'],
        'Краснодарский край' => ['Краснодар', 'Сочи', 'Анапа', 'Новороссийск'],
    ];
}

function getCitiesByFirstLetter(string $letter): array
{
    $result = [];

    foreach (getRegionList() as $region => $cities) {
        $matchedCities = array_filter($cities, function (string $city) use ($letter): bool {
            return mb_substr($city, 0, 1, 'UTF-8') === $letter;
        });

        if ($matchedCities !== []) {
            $result[$region] = array_values($matchedCities);
        }
    }

    return $result;
}

function transliterateText(string $text): string
{
    $letters = [
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
        'е' => 'e', 'ё' => 'yo', 'ж' => 'zh', 'з' => 'z', 'и' => 'i',
        'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n',
        'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
        'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'ts', 'ч' => 'ch',
        'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '',
        'э' => 'e', 'ю' => 'yu', 'я' => 'ya',
    ];

    foreach ($letters as $russian => $latin) {
        $letters[mb_strtoupper($russian, 'UTF-8')] = ucfirst($latin);
    }

    return strtr($text, $letters);
}
