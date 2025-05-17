

namespace DisplaySpace
{
    public enum DisplayType
    {
        _SD,
        _HD,
        _Full_HD,
        _2K_Quad_HD,
        _4K_Ultra_HD
    }

    public static class DisplayTypeExtension
    {
        public static string GetStringType(this DisplayType displayType)
        {
            bool isSD = displayType == DisplayType._SD;
            bool isHD = displayType == DisplayType._HD;
            bool isFullHD = displayType == DisplayType._Full_HD;
            bool is2kQuadHD = displayType == DisplayType._2K_Quad_HD;
            bool is4kUltraHD = displayType == DisplayType._4K_Ultra_HD;

            if (isSD)
            {
                return $"480p SD";
            }

            else if (isHD)
            {
                return $"720p HD";
            }

            else if (isFullHD)
            {
                return $"1080p FUll HD";
            }

            else if (is2kQuadHD)
            {
                return $"1440p 2k Quad HD";
            }

            else if (is4kUltraHD)
            {
                return $"2160p 4k Ultra HD";
            }

            return "";
        }

        public static Dimension GetDimensions(this DisplayType displayType)
        {

            if (displayType == DisplayType._SD)
            {
                return new Dimension(640, 480);
            }

            if (displayType == DisplayType._HD)
            {
                return new Dimension(1280, 720);
            }

            if (displayType == DisplayType._Full_HD)
            {
                return new Dimension(1920, 1080);
            }

            if (displayType == DisplayType._2K_Quad_HD)
            {
                return new Dimension(2560, 1440);
            }

            if (displayType == DisplayType._4K_Ultra_HD)
            {
                return new Dimension(3480, 2160);
            }

            return new Dimension(640, 480);
        }
    }

}