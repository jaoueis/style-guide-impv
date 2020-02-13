<?php
$color_info = file_get_contents('./data/colors.json');
$data       = json_decode($color_info, true);

foreach ($data['colors'] as $color) : ?>

    <div class="col-12 col-md-6 col-xl-4">
        <div class="sg_box_helper">
            <div class="color" style="background-color:<?php echo $color['hex']; ?>"></div>
            <h3><?php echo $color['name'] . " Color"; ?></h3>
            <span>HEX: <?php echo $color['hex']; ?></span>
        </div>
    </div>

<?php endforeach; ?>