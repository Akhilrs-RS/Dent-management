namespace backend.Models;

public class FollowUp
{
    public int Id { get; set; }
    public string Date { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public string Doc { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
}
