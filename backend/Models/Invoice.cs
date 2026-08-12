namespace backend.Models;

public class Invoice
{
    public string Id { get; set; } = string.Empty;
    public string Patient { get; set; } = string.Empty;
    public string Treatment { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string Due { get; set; } = string.Empty;
    public string Total { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string StatusColor { get; set; } = string.Empty;
    public string StatusText { get; set; } = string.Empty;
    public string Balance { get; set; } = string.Empty;
}
