namespace backend.Models;

public class TreatmentCategory
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Count { get; set; }
    public string Desc { get; set; } = string.Empty;
}
