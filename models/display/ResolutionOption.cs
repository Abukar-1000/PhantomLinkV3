

using DisplaySpace;

namespace Display.Models
{
    public class ResolutionOption
    {
        public int id { get; set; }
        public string tag { get; set; }
        public Dimension dimension { get; set; }

        public ResolutionOption() { }
        public ResolutionOption(
            int id,
            string tag,
            Dimension dimension
        )
        {
            this.id = id;
            this.tag = tag;
            this.dimension = dimension;
        }
    }
}