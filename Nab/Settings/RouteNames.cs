namespace Nab.Settings
{
    /// <summary>
    /// List of available route names extracted from controller Route attributes where the 
    /// route name is a cleaner URL. Makes the route name available in views and defined in a single 
    /// place, in the controller Route attribute.
    /// </summary>
    public static class RouteNames
    {
        public const string LibertedExpression = nameof(LibertedExpression);
        public const string RailEurope = nameof(RailEurope);
        public const string TelegraphSubs = nameof(TelegraphSubs);
        public const string GcrRst = nameof(GcrRst);
        public const string Nthc = nameof(Nthc);
        public const string LmAdmin = nameof(LmAdmin);
        public const string DmKcProto = nameof(DmKcProto);
        public const string Tpm = nameof(Tpm);
        public const string Marketline = nameof(Marketline);
        public const string DmKcs = nameof(DmKcs);
        public const string ThePod = nameof(ThePod);
        public const string CorpTools = nameof(CorpTools);
    }
}
