using System;

namespace MyBlazorWebAssembly.Models
{
    /// <summary>
    /// 博客文章模型
    /// </summary>
    public class BlogModel
    {
        /// <summary>
        /// 文章ID
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// 文章标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 文章内容
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// 创建日期时间
        /// </summary>
        public DateTime CreateDateTime { get; set; }

        /// <summary>
        /// 最后改动时间(修改、评论)
        /// </summary>
        public DateTime LastModifyDateTime { get; set; }

        /// <summary>
        /// 文章标签
        /// </summary>
        public BlogTag BlogTag { get; set; }

        /// <summary>
        /// 文章内容字数
        /// </summary>
        public int Words { get; set; }

        /// <summary>
        /// 文章最新改动时间距离当前的时间跨度
        /// </summary>
        public TimeSpan ModifyTimeSpan { get; set; }

        /// <summary>
        /// 文章被阅读次数
        /// </summary>
        public int ViewTimes { get; set; }

        /// <summary>
        /// 文章评论数目
        /// </summary>
        public int CommentsNum { get; set; }
    }
}