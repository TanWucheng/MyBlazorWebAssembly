using System;

namespace MyBlazorWebAssembly.Attributes
{
    /// <summary>
    /// 枚举字段Remark特性
    /// </summary>
    [AttributeUsage(AttributeTargets.Field)]
    public class EnumRemarkAttribute : Attribute
    {
        public EnumRemarkAttribute(string remark)
        {
            Remark = remark;
        }

        public string Remark { get; private set; }
    }
}