function karma(start_xp, end_xp) {
    if (start_xp < 12 && 12 <= end_xp ) return 3;
    if (end_xp %12 < start_xp % 12 ) return 1;
    return 0;
}

function level_to_xp(level) {
    return 12 * (level - 1);
}