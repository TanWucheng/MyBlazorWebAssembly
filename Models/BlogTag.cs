using MyBlazorWebAssembly.Attributes;

namespace MyBlazorWebAssembly.Models
{
    public enum BlogTag
    {
        /// <summary>
        /// 随记
        /// </summary>
        [EnumRemark("随记")] Notes,

        /// <summary>
        /// 心得
        /// </summary>
        [EnumRemark("心得")] Experience,

        /// <summary>
        /// 教程
        /// </summary>
        [EnumRemark("教程")] Course
    }
}