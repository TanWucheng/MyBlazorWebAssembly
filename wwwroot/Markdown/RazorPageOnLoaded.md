__Razor组件如何执行加载完毕回调？__

___1.重写Razor组件的OnInitializedAsync()方法___

``` c#
@code {
    void SomeStartupMethod()
    {
        // Do Some Work
    }
    
    Task SomeStartupTask()
    {
        // Do some task based work
        return Task.CompletedTask;
    }
    
    protected override async Task OnInitializedAsync()
    {
        SomeStartupMethod();
        await SomeStartupTask();
    }
}
```

___2.重写Razor组件的OnAfterRender()方法___

``` c#
@code{
    protected override void OnAfterRender(bool firstRender)
    {
        // execute conditionally for loading data, otherwise this will load
        // every time the page refreshes
        if(firstRender)
        {
            // Do work to load page data and set properties
        }
    }
}
```