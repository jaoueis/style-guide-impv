<?php
$font_info = file_get_contents('./data/typography.json');
$data      = json_decode($font_info, true);

foreach ($data['fonts'] as $font) : ?>

    <div class="col-12 col-md-6">
        <div class="sg_box_helper">
            <h3><?php echo $font['name']; ?></h3>
            <strong><?php echo $font['type']; ?></strong>
            <br>
            <strong><?php echo $font['source']; ?></strong>
            <br>
            <a href="<?php echo $font['link'] ?>" target="_blank"><?php echo $font['link'] ?></a>
            <p class="font-<?php echo strtolower($font['type']); ?>">In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Sed cursus turpis vitae tortor. Donec mollis hendrerit risus. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Ut leo.</p>
        </div>
    </div>

<?php endforeach; ?>