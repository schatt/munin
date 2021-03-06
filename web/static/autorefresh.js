/**
 * Graphs auto-refresh
 */

function startAutoRefresh() {
	// Register on image load event to hide loading styles
	$('.graph').on('load', function() {
		setImageLoading($(this), false);
	});

	setInterval(refreshGraphs, 5*60*1000);
}

/**
 * Tells UI that this specific image is loading (or not)
 *  (lowers opacity and shows loading spinner)
 */
function setImageLoading(imgDomElement, isLoading) {
	if (isLoading) {
		imgDomElement.parent().css('opacity', '0.7');
		imgDomElement.next().show();
	} else {
		imgDomElement.parent().css('opacity', '1');
		imgDomElement.next().hide();
	}
}

/**
 * Refresh every graph in this page
 */
function refreshGraphs() {
	$('.graph').each(function() {
		var src = $(this).attr('src');

		// Remove current timestamp if there is one
		if (src.indexOf('?') != -1)
			src = src.substring(0, src.indexOf('?'));

		// Add new timestamp
		src += '?' + new Date().getTime();

		setImageLoading($(this), true);

		$(this).attr('src', src);
	});
}
