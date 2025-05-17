
namespace DisplaySpace {
    public class Display
    {
        public string tag { get; set; } = "";
        public DisplayType type { get; set; }
        public Dimension dimension { get; set; }

        public Display() { }
        public Display(Dimension dimension)
        {
            this.dimension = dimension;
        }

        public override string ToString()
        {
            return $"{this.dimension.width} X {this.dimension.height}\t{this.tag}";
        }
    }
}