using System;
using System.Linq;
using MyBlazorWebAssembly.Attributes;
using MyBlazorWebAssembly.Models;

namespace MyBlazorWebAssembly.Extensions
{
    /// <summary>
    /// 枚举扩展类
    /// </summary>
    public static class EnumExtension
    {
        /// <summary>
        /// 获取BlogTag字段的Remark特性值
        /// </summary>
        /// <param name="blogTag"></param>
        /// <returns></returns>
        public static string GetRemark(this BlogTag blogTag)
        {
            var fieldName = Enum.GetName(typeof(BlogTag), blogTag);
            var attributes = typeof(BlogTag).GetField(fieldName ?? string.Empty)?.GetCustomAttributes(false);
            return !((attributes ?? Array.Empty<object>()).FirstOrDefault(p =>
                p.GetType() == typeof(EnumRemarkAttribute)) is EnumRemarkAttribute enumDisplayAttribute)
                ? fieldName
                : enumDisplayAttribute.Remark;
        }
    }
}